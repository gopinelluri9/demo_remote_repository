import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MyWatchlistComponent} from "./my-watchlist/my-watchlist.component";
import {CategoriesComponent} from "./categories/categories.component";
import {MyreviewsComponent} from "./myreviews/myreviews.component";
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {MyPolesComponent} from "./my-poles/my-poles.component";


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'my-watchlist', component: MyWatchlistComponent},
  { path: 'categories', component: CategoriesComponent},
  {path: 'my-reviews', component:MyreviewsComponent},
  {path: 'my-poles', component: MyPolesComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'catalog', component: CatalogComponent},

  {
    path: 'movies',
    loadChildren: () => import('./movies/movies.module').then(mod => mod.MoviesModule)
  },

  {
    path: 'movies/:id', loadChildren: () => import('./movie-details/movie-details.module').then(mod => mod.MovieDetailsModule)
  },

  {
    path: 'tv',
    loadChildren: () => import('./tv-shows/tv-shows.module').then(mod => mod.TvShowsModule)
  },

  {
    path: 'tv/:id',
    loadChildren: () => import('./tv-show-details/tv-show-details.module').then(mod => mod.TvShowDetailsModule)
  },

  {
    path: 'genres/:id/:name',
    loadChildren: () => import('./genre/genre.module').then(mod => mod.GenreModule)
  },

  {
    path: 'person/:id',
    loadChildren: () => import('./person/person.module').then(mod => mod.PersonModule)
  },

  {
    path: 'genres',
    loadChildren: () => import('./genre-list/genre-list.module').then(mod => mod.GenreListModule)
  },
  {
    path: 'genres-tv/:id/:name',
    loadChildren: () => import('./tv-genre/tv-genre.module').then(m => m.TvGenreModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
