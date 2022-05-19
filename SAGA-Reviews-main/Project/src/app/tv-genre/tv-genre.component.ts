import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TvService } from 'src/app/service/tv.service';


@Component({
  selector: 'app-tv-genre',
  templateUrl: './tv-genre.component.html',
  styleUrls: ['./tv-genre.component.css']
})
export class TvGenreComponent implements OnInit {

  tvList : any;
  title: string;
  public id: number;

  constructor(
    private tvService: TvService,
    private router: ActivatedRoute

  ) { }

  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.title = params['name'];
      this.getTvByGenre(this.id);
    });
  }

  getTvByGenre(id) {
    this.tvService.getTVShowByGenre(id).subscribe((res: any) => {
        this.tvList = res.results;
    });
  }

}
