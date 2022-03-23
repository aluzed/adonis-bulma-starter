ModelName : use singular

# Generate model

node ace make:model <ModelName> [options]

options:

-m : generate migrations too

# Generate controller

node ace make:controller <ModelName>

# Run migration

node ace migration:run
node ace migration:rollback