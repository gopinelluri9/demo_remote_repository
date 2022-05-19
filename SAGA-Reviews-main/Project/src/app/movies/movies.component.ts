import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { delay } from 'rxjs/internal/operators/delay';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {
  topRated: any;
  responsiveOptions;
  loader = true;
  totalResults: any;
  // tslint:disable-next-line:variable-name
  total_results: any;
  searchRes: any;
  searchStr: string;
  nowPlaying: any;

  constructor(
      private movieService: MoviesService,
      private movies: MoviesService
              ) {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit() {
    this.getTopRatedMovies(1);
    this.trendingMovies(1)
  }

  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).pipe(delay(2000)).subscribe((res: any) => {
      this.topRated = res.results;
      this.totalResults = res.total_results;
      this.loader = false;
    });
  }

  trendingMovies(page: number) {
    this.movies.getNowPlaying(page).pipe(delay(2000)).subscribe((res: any) => {
      this.nowPlaying = res.results;
      this.loader = false;
    });
  }

  changePage(event) {
    this.loader = true;
    this.getTopRatedMovies(event.pageIndex + 1);
  }

  searchMovies() {
    this.movieService.searchMovies(this.searchStr).subscribe(res => {
      this.searchRes = res.results;
    });
  }


}
