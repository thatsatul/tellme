import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.page.html',
  styleUrls: ['./item-page.page.scss'],
})
export class ItemPage implements OnInit {

  stores = null;
  ads = null;

  constructor(private commonService: CommonService, private http: HttpClient) {}

  ngOnInit() {
    console.log(this.commonService.selectedItem, this.commonService.position);
    const item = this.commonService.selectedItem;
    const postBody = {
      userid: this.commonService.userId,
      lat: this.commonService.position.latitude,
      lng: this.commonService.position.longitude,
    }

    this.http.post("http://10.91.1.84:5000/api/getplaces?itemname=" + item.itemName, postBody, this.commonService.httpOptions)
    .subscribe((res: any) => {
        console.log(res);
        this.stores = res.places;
        this.ads = res.ads;
    });
  }
}
