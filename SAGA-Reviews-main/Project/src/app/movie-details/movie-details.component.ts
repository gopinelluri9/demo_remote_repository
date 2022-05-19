import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { ActivatedRoute , Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AppMovieDialogComponent } from '../movie-details/app-movie-dialog/app-movie-dialog.component';
import { UserDetailService } from 'src/app/service/user-detail.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  public id: number;
  public video: boolean;
  movie: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  relatedvideo: any;
  casts: any = [];
  backdrops: any = [];
  recomendMovies: any = [];
  responsiveOptions;
  disable: boolean = true;
  savedComments: any;
  userWatchList: any;



  constructor(
    private movieService: MoviesService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    public _data: UserDetailService,
    private http: HttpClient
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
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.getSingleMoviesVideos(this.id);
      this.getSingleMoviesDetails(this.id);
      this.getCast(this.id);
      this.getBackropsImages(this.id);
      this.getRecomendMovie(this.id);
      this.getSavedComments();
    });
  }

  getSingleMoviesDetails(id){
    this.movieService.getMovie(id).subscribe((res: any) => {
      this.movie = res;
    });
  }

  getSingleMoviesVideos(id) {
    this.movieService.getMovieVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.relatedvideo = res.results;
      }
    });
  }

  openDialogMovie(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay); 
    this.dialog.open(AppMovieDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video}
    });
  }
  
  getCast(id) {
    this.movieService.getMovieCredits(id).subscribe((res: any) => {
      this.casts = res.cast;
    });
  }

  getBackropsImages(id) {
    this.movieService.getBackdropsImages(id).subscribe((res: any) => {
      this.backdrops = res.backdrops;
    });
  }

  getRecomendMovie(id) {
    this.movieService.getRecomendMovies(id).subscribe((res: any) => {
      this.recomendMovies = res.results;
    });
  }

  
  saveComment(comment) {
    this.http.post("http://localhost:3000/api/saveComment",
      { content_id:Number(this.id), name: this._data.name, comment: comment.value }).subscribe((res) => {
        if (res['data'])
          console.log("comment saved succesfully");
        else
        console.log("error");
      })
    window.location.reload();
  }

  getSavedComments() {
    this.http.get("http://localhost:3000/api/getComments")
      .subscribe((res) => {
        this.savedComments = res;
    })
  }

  saveWatchList() {
    this.http.post("http://localhost:3000/api/saveWatchList",
      {
        user_id: this._data.id, content_id: Number(this.id), name: this._data.name,
      title: this.movie.original_title}).subscribe((res) => {
      if (res['data'])
        console.log("watchlist added for the user");
      else
        console.log("error");
        
        
    })
  }

}
