import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as npmSearch from 'libnpmsearch';

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log('HTTP trigger function processed a request.');
  const query = req.query.text;

  if (query) {
    const searchResults = await npmSearch(query, { detailed: true });

    context.res = {
      // status: 200, /* Defaults to 200 */
      body: JSON.stringify(searchResults)
    };
  } else {
    context.res = {
      status: 400,
      body: 'Please pass search text on the query string'
    };
  }
};

export default httpTrigger;
