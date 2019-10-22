import * as npmFetch from 'npm-registry-fetch';

type Dependencies = Record<string, string>;

interface DependencyNode {
  name: string;
  dependencies: DependencyNode[];
}

const cache: Record<string, Promise<DependencyNode>> = {};

export async function getDependencyTree(
  packageName: string,
  version = 'latest'
): Promise<DependencyNode> {
  if (cache[packageName]) return cache[packageName];

  const res = await npmFetch.json(`/${packageName}/${version}`);

  let dependencies = [];

  if (res.dependencies) {
    const deps = res.dependencies as Dependencies;

    dependencies = await Promise.all(
      Object.keys(deps).map(depName => {
        const req = getDependencyTree(depName);

        cache[res.name as string] = req;

        return req;
      })
    );
  }

  const depNode: DependencyNode = { name: res.name as string, dependencies };

  return depNode;
}
