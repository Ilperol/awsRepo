# Install Dependencies

yarn install

## Set Up DynamoDB Local
# Install DynamoDB Local:

yarn dynamo:install

# Start DynamoDB Local:
yarn dynamo:start

# In another terminal, start the Serverless Offline server:
yarn offline:start
yarn dynamo:start: Starts DynamoDB Local on port 8000.
yarn offline:start: Starts the Serverless Offline server on port 3000.
