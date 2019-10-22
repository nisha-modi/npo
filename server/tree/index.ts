import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getDependencyTree } from './tree';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  const name = req.query.name;
  const version = req.query.version;

  if (name) {
    const deps = await getDependencyTree(name, version);

    context.res = {
      body: JSON.stringify(deps)
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass a name on the query string or in the request body'
    };
  }
};

export default httpTrigger;
