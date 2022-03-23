import Route from '@ioc:Adonis/Core/Route'

Route.get('/pictures/:id', 'PicturesController.display')

Route.group(() => {
  Route.get('/', 'PicturesController.upload')
  Route.post('/', 'PicturesController.create').as('pictures.create')
})
  .prefix('/pictures')
  .middleware('auth')
