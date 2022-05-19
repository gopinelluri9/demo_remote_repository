import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {CarouselModule} from 'primeng/carousel';
import { MyWatchlistComponent } from './my-watchlist/my-watchlist.component';
import { CategoriesComponent } from './categories/categories.component';
import { MyPolesComponent } from './my-poles/my-poles.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { CatalogComponent } from './catalog/catalog.component';
import {SkeletonModule} from "./shared/skeleton/skeleton.module";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipeModule } from './pipe/pipe.module';
import { MatPaginatorModule } from "@angular/material/paginator";
import { ReactiveFormsModule } from '@angular/forms'
import { UserDetailService } from "./service/user-detail.service";
import { WishlistComponent } from './wishlist/wishlist.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyWatchlistComponent,
    CategoriesComponent,
    MyPolesComponent,
    SigninComponent,
    SignupComponent,
    AboutUsComponent,
    MyreviewsComponent,
    CatalogComponent,
    WishlistComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        PipeModule,
        CarouselModule,
        SkeletonModule,
        MatProgressBarModule,
        BrowserAnimationsModule,
        SidebarModule,
        MatProgressSpinnerModule,
      MatPaginatorModule,
      ReactiveFormsModule

    ],
  providers: [UserDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
