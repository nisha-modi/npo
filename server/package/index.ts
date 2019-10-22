import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as npmFetch from 'npm-registry-fetch';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  const name = req.query.name;
  const version = req.query.version;

  if (name && version) {
    const isScoped = name.startsWith('@');

    let pkg;

    if (isScoped) {
      // The dumb version endpoint doesn't handle scoped packages, so get all versions
      // and just return the latest one
      const { versions } = await npmFetch.json(`/${name}`);

      const versionKeys = Object.keys(versions).sort();

      pkg = versions[versionKeys[versionKeys.length - 1]];
    } else {
      pkg = await npmFetch.json(`/${name}/${version}`);
    }

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(pkg)
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body'
    };
  }
};

export default httpTrigger;
