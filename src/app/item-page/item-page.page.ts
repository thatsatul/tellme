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
      let stores = [
          {
              "formattedAddress": null,
              "geometry": {
                  "bounds": null,
                  "location": {
                      "lat": 17.440951,
                      "lng": 78.3598775
                  },
                  "locationType": null,
                  "viewport": {
                      "northeast": {
                          "lat": 17.44230082989272,
                          "lng": 78.36122732989271
                      },
                      "southwest": {
                          "lat": 17.43960117010727,
                          "lng": 78.35852767010728
                      }
                  }
              },
              "name": "srivinayaka computers",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
              "placeId": "ChIJie8lI7yTyzsRmr1zMKrxaLA",
              "scope": "GOOGLE",
              "rating": 3.8,
              "types": [
                  "electronics_store",
                  "store",
                  "point_of_interest",
                  "establishment"
              ],
              "openingHours": {
                  "openNow": false,
                  "periods": null,
                  "weekdayText": null,
                  "permanentlyClosed": null
              },
              "photos": [
                  {
                      "photoReference": "CmRaAAAA0qSvVMKX381sCw-jgf08GI6GmvmEpr5wxNUmfyTMJRSF8j_XewbIUtKeK8H2VE28U2tw-uh9Or_g_cElwG3Ik14q56XUufmazqRA0Za0noF9-mRIR2OF9NY9P9OGaBlWEhDTFZ1s-ouuhJcyORORjUnhGhSmCkln9QFmzGFppzEtVG3KB2MPUQ",
                      "height": 1080,
                      "width": 1920,
                      "htmlAttributions": [
                          "<a href=\"https://maps.google.com/maps/contrib/118376532922801222533/photos\">Niteen Balpande</a>"
                      ]
                  }
              ],
              "vicinity": "Vinayak Nagar, Indira Nagar, Gachibowli, Hyderabad",
              "permanentlyClosed": false
          },
          {
              "formattedAddress": null,
              "geometry": {
                  "bounds": null,
                  "location": {
                      "lat": 17.4481277,
                      "lng": 78.363782
                  },
                  "locationType": null,
                  "viewport": {
                      "northeast": {
                          "lat": 17.44948357989272,
                          "lng": 78.36506412989272
                      },
                      "southwest": {
                          "lat": 17.44678392010728,
                          "lng": 78.36236447010728
                      }
                  }
              },
              "name": "Pasari's Electro Hub",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
              "placeId": "ChIJc1kj5MCTyzsRnx7NozyVAF8",
              "scope": "GOOGLE",
              "rating": 4.8,
              "types": [
                  "electronics_store",
                  "store",
                  "point_of_interest",
                  "establishment"
              ],
              "openingHours": {
                  "openNow": false,
                  "periods": null,
                  "weekdayText": null,
                  "permanentlyClosed": null
              },
              "photos": [
                  {
                      "photoReference": "CmRaAAAA6n9cFtv1FU2pwL7JbDL6DRFyzjDa_lDDvpVzn0E6tHCflstfZDVc2IYX0oi3WpRuDfqdUDT17a7gOATHCXGveaqauz98EfKAUMs-72taB9GvuDP9yJjzNEtAEbBa3d86EhBHtNM6pflV1iSLh-MFWj0yGhQhUKh9xwNgjmtCGlxxrUVtRmnqmQ",
                      "height": 4640,
                      "width": 2610,
                      "htmlAttributions": [
                          "<a href=\"https://maps.google.com/maps/contrib/112889952861238851132/photos\">Sanmati Kivade</a>"
                      ]
                  }
              ],
              "vicinity": "The Platina, # 1-60/6/1, Anjaiah Nagar, Opp. Hotel Radisson OR, Kondapur, To, Gachibowli Rd, Building, Gachibowli, Hyderabad",
              "permanentlyClosed": false
          },
          {
              "formattedAddress": null,
              "geometry": {
                  "bounds": null,
                  "location": {
                      "lat": 17.461054,
                      "lng": 78.366655
                  },
                  "locationType": null,
                  "viewport": {
                      "northeast": {
                          "lat": 17.46240382989273,
                          "lng": 78.36800482989271
                      },
                      "southwest": {
                          "lat": 17.45970417010728,
                          "lng": 78.36530517010726
                      }
                  }
              },
              "name": "Gkz Technologies",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
              "placeId": "ChIJT1NiTUqSyzsRtowGzQdkgqE",
              "scope": "GOOGLE",
              "rating": 4.8,
              "types": [
                  "electronics_store",
                  "store",
                  "point_of_interest",
                  "establishment"
              ],
              "openingHours": {
                  "openNow": true,
                  "periods": null,
                  "weekdayText": null,
                  "permanentlyClosed": null
              },
              "photos": [
                  {
                      "photoReference": "CmRaAAAAcHS7_3QIqIk2z1lp3tTUjeYoZqN4pQgIP0xVom-Z1AR8TDDwWft1cn4bTd9L0X_C6LUEiT0jLYBwLW6E_h9AM3JjjQmFfQ2v01eSkTca7uZyCrctAZ67IlgLpgCnXYqwEhA8jUvEWFxCzqAngYzTnTckGhS5AjYN2nkDmL-sCQoZrXZrSH5g9g",
                      "height": 362,
                      "width": 362,
                      "htmlAttributions": [
                          "<a href=\"https://maps.google.com/maps/contrib/117980484545256577277/photos\">Gkz Technologies</a>"
                      ]
                  }
              ],
              "vicinity": "Opp Harsha Toyota Showroom, Kottaguda Kondapur, Hyderabad",
              "permanentlyClosed": false
          },
          {
              "formattedAddress": null,
              "geometry": {
                  "bounds": null,
                  "location": {
                      "lat": 17.4409086,
                      "lng": 78.3606756
                  },
                  "locationType": null,
                  "viewport": {
                      "northeast": {
                          "lat": 17.44225842989272,
                          "lng": 78.36202542989271
                      },
                      "southwest": {
                          "lat": 17.43955877010728,
                          "lng": 78.35932577010728
                      }
                  }
              },
              "name": "HP Laptop Service Center in Gachibowli",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
              "placeId": "ChIJvRh_A8CTyzsR-aOguljBoII",
              "scope": "GOOGLE",
              "rating": 4,
              "types": [
                  "electronics_store",
                  "store",
                  "point_of_interest",
                  "establishment"
              ],
              "openingHours": {
                  "openNow": true,
                  "periods": null,
                  "weekdayText": null,
                  "permanentlyClosed": null
              },
              "photos": null,
              "vicinity": "Indra Nagar,Gachibowli,behind UDIPI Hotel, Gachibowli,Hyderabad, Hyderabad",
              "permanentlyClosed": false
          },
          {
              "formattedAddress": null,
              "geometry": {
                  "bounds": null,
                  "location": {
                      "lat": 17.460282,
                      "lng": 78.354156
                  },
                  "locationType": null,
                  "viewport": {
                      "northeast": {
                          "lat": 17.46163182989272,
                          "lng": 78.35550582989273
                      },
                      "southwest": {
                          "lat": 17.45893217010727,
                          "lng": 78.35280617010729
                      }
                  }
              },
              "name": "Dell Store & Service Raj Computers",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
              "placeId": "ChIJ4VaBaLGTyzsRshExUUCljzI",
              "scope": "GOOGLE",
              "rating": 4,
              "types": [
                  "electronics_store",
                  "store",
                  "point_of_interest",
                  "establishment"
              ],
              "openingHours": {
                  "openNow": false,
                  "periods": null,
                  "weekdayText": null,
                  "permanentlyClosed": null
              },
              "photos": [
                  {
                      "photoReference": "CmRaAAAAn7VBmec2n2MUuFJXN_-wur_AcNCPEJzOD3fv_LZsgJN8bDn_9R5vEViNteZ42iR-XsQO6smbv20wsnW3KaEr6YVsBa5IVhc4owWhp7LvEI9x1JLs_IyHUtuGKlzm-NLIEhBN2V3ubdUB00eff5w8XsffGhQJNSvip-IJcfv0R7hr_VMF12xQhg",
                      "height": 2448,
                      "width": 3264,
                      "htmlAttributions": [
                          "<a href=\"https://maps.google.com/maps/contrib/100206426261236363292/photos\">A Google User</a>"
                      ]
                  }
              ],
              "vicinity": "1-57/1/B, PLOT NO: 264, KONDAPUR, SRIRAM NAGAR COLONY, Hyderabad",
              "permanentlyClosed": false
          },
          {
              "formattedAddress": null,
              "geometry": {
                  "bounds": null,
                  "location": {
                      "lat": 17.4410773,
                      "lng": 78.3606226
                  },
                  "locationType": null,
                  "viewport": {
                      "northeast": {
                          "lat": 17.44242712989272,
                          "lng": 78.36197242989273
                      },
                      "southwest": {
                          "lat": 17.43972747010728,
                          "lng": 78.35927277010728
                      }
                  }
              },
              "name": "Dell Laptop Service Center in Gachibowlli",
              "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
              "placeId": "ChIJVVWFJ5WTyzsReRqxTZGcCo4",
              "scope": "GOOGLE",
              "rating": 4.5,
              "types": [
                  "electronics_store",
                  "store",
                  "point_of_interest",
                  "establishment"
              ],
              "openingHours": {
                  "openNow": false,
                  "periods": null,
                  "weekdayText": null,
                  "permanentlyClosed": null
              },
              "photos": null,
              "vicinity": "kannayalal complex,indra nagar,Gachibowli hyderabad, Gachibowli",
              "permanentlyClosed": false
          }
      ];

    this.http.post("http://10.91.1.84:5000/api/getplaces?itemname=" + item.itemName, postBody, this.commonService.httpOptions)
    .subscribe((res: any) => {
        console.log('res--------', res);
        // this.stores = res.places;
        this.ads = res.ads;
    });
      this.stores = stores;
  }

    truncateFun(text) {
        console.log('text is----', text);
        if (text.length > 25) {
            return text.substring(0, 24) + '...';
        }
        return text;
    }

    navigateToMaps(lat, lng) {
        console.log('lat, lng is----', lat, lng);
    }
}
