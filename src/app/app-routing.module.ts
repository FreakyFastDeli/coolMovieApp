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
    loadChildren: () => import('./pages/people/people.module').then( m => m.PeoplePageModule)
  },
  {
    path: 'tv',
    loadChildren: () => import('./pages/tv/tv.module').then( m => m.TvPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
