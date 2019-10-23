export class Dependency {
  name: string = 'null';
  version: string = 'null';
  description: string = 'null';
  dependencyScore: number = null;
  optimal: number = null;
  quality: number = null;
  maintenence: number = null;
  popularity: number = null;
  treeScore: string = null;
  alternatives: Dependency[];
}
