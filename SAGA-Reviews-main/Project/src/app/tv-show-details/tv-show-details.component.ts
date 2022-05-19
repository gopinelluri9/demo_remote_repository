import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute , Params} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AppTvDialogComponent } from './app-tv-dialog/app-tv-dialog.component';
import { TvService } from 'src/app/service/tv.service';
import { UserDetailService } from 'src/app/service/user-detail.service';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})

export class TvShowDetailsComponent implements OnInit {

  public id: number;
  public video: boolean;
  episode: any;
  baseUrl = 'https://www.youtube.com/embed/';
  autoplay = '?rel=0;&autoplay=1&mute=0';
  related_video: any;
  casts: any;
  backdrop: any;
  _posters: any;
  _recomend: any;
  responsiveOptions;
  disable: boolean = true;
  savedComments: any;

  constructor(
    private tvService: TvService,
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
      console.log(params);
      this.id = params['id'];
      console.log(this.id);
      this.getTvDetails(this.id);
      this.getTvVideos(this.id);
      this.getTvCast(this.id);
      this.getTvBackropsImages(this.id);
      this.getRecomendTv(this.id);
      this.getSavedComments();
    });
  }

  getTvDetails(id) {
    this.tvService.getTVShow(id).subscribe((res: any) => {
      this.episode = res;
    });
  }

  getTvVideos(id) {
    this.tvService.getTvVideos(id).subscribe((res: any) => {
      if (res.results.length) {
        this.video = res.results[0];
        this.related_video = res.results;
      }
    });
  }

  openDialogTv(video): void {
    this.video['url'] = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + video.key + this.autoplay);
    this.dialog.open(AppTvDialogComponent, {
      height: '600px',
      width: '900px',
      data: { video: this.video}
    });
  }

  getTvCast(id) {
    this.tvService.getMovieCredits(id).subscribe((res: any) => {
      this.casts = res.cast;
    });
  }

  getTvBackropsImages(id) {
    this.tvService.getTvBackdropsImages(id).subscribe((res: any) => {
      this.backdrop = res.backdrops;
    });
  }

  getRecomendTv(id) {
    this.tvService.getRecomendTv(id).subscribe((res: any) => {
      this._recomend = res.results;
    });
  }

  saveComment(comment) {
    console.log("button clicked with value ----------" + this._data.name + "---------" + comment.value);
    console.log(window.location.href);
    console.log(this.id);
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
        console.log(res);
        console.log(res[0].id);
        this.savedComments = res;
    })
  }

  saveWatchList() {
    this.http.post("http://localhost:3000/api/saveWatchList",
      {
        user_id: this._data.id, content_id: Number(this.id), name: this._data.name,
      title: this.episode.name}).subscribe((res) => {
      if (res['data'])
        console.log("watchlist added for the user");
      else
        console.log("error");
        
        
    })
  }
}
