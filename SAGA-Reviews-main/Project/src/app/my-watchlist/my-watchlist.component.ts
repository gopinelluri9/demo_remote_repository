import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDetailService } from 'src/app/service/user-detail.service';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-my-watchlist',
  templateUrl: './my-watchlist.component.html',
  styleUrls: ['./my-watchlist.component.css']
})
export class MyWatchlistComponent implements OnInit {

  constructor(private movieService: MoviesService,private http: HttpClient, public _data: UserDetailService,) { }

  ngOnInit() {
    this.getWatchList();
  }

    userWatchList: any;
    movie: any;
    list:any = [];

  getWatchList() {
    this.http.get("http://localhost:3000/api/getWatchList")
      .subscribe((res) => {
        this.userWatchList = res;
        console.log(this.userWatchList);
      })
  }

  

    getSingleMoviesDetails(id): any{    
    this.movieService.getMovie(id).subscribe((res: any) => {
      this.movie = res;
      return this.movie;
    });
  }
  

}
