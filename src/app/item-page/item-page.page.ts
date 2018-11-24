import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.page.html',
  styleUrls: ['./item-page.page.scss'],
})
export class ItemPage implements OnInit {

  stores = null;
  ads = null;

  constructor(private commonService: CommonService, private http: HttpClient, private launchNavigator: LaunchNavigator) {}

  ngOnInit() {
    console.log(this.commonService.selectedItem, this.commonService.position);
    const item = this.commonService.selectedItem;
    if(!this.commonService.position) {
      return;
    }
    const postBody = {
      userid: this.commonService.userId,
      lat: this.commonService.position.coords.latitude,
      lng: this.commonService.position.coords.longitude,
    }
    this.http.post("http://10.91.1.84:5000/api/getplaces?itemname=" + item.itemName, postBody, this.commonService.httpOptions)
    .subscribe((res: any) => {
        console.log('res--------', res);
        this.stores = res.places;
        this.ads = res.ads;
    });
      const byRating = this.stores.slice(0);
      byRating.sort(function(a, b) {
          const y = a.rating;
          const x = b.rating;
          return x < y ? -1 : x > y ? 1 : 0;
      });
      this.stores = byRating;
  }

    truncateFun(text) {
        if (text.length > 40) {
            return text.substring(0, 39) + '...';
        }
        return text;
    }

    navigateToMaps(lat, lng) {
        this.launchNavigator.navigate('Patna');
        // window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
}
