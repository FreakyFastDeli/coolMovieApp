import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () => 
    import('./pages/movies/movies.module').then( 
      (m) => m.MoviesPageModule)
  },
  {
    path: 'movies/:id',
    loadChildren: () => 
    import('./pages/movie-details/movie-details.module').then( 
      (m) => m.MovieDetailsPageModule)
  },
  {
    path: 'people',
    loadChildren: () => 
    import('./pages/people/people.module').then(
      (m) => m.PeoplePageModule)
  },
  {
    path: 'people/:id',
    loadChildren: () => 
    import('./pages/people-details/people-details.module').then(
      (m) => m.PeopleDetailsPageModule)
  },
  {
    path: 'tv',
    loadChildren: () => 
    import('./pages/tv/tv.module').then(
      (m) => m.TvPageModule)
  },
  {
    path: 'tv/:id',
    loadChildren: () => 
    import('./pages/tv-details/tv-details.module').then(
      (m) => m.TvDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
