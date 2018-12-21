import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Pipe, PipeTransform } from '@angular/core';
// declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Pipe({
    name: 'filter'
})

export class HomeComponent implements OnInit {

    data: any;
    metas: any;
    keywords: Object;
    publisher: String;
    title: String;
    dateEdit: String;
    fields: any;
    records: any;
    val: any;
    searchText: String;
    length: any;
    start: any;
    show: any;
    numberPage: any;

    cleanString(value) {
        value = value.replace(/-/g, ' ');
        return value.toLowerCase();
    }

    changePage(state, page) {
        switch (state) {
            case 'goTo':
                if (page == this.numberPage) {
                    state = 'last';
                } else {
                    this.start = page;
                }
                break;
            case 'next':
                if (this.start < this.numberPage) {
                    this.start += 1;
                }
                break;
            case 'prev':
                if (this.start > 1) {
                    this.start -= 1;
                }
                break;
            case 'last':
                this.start = this.numberPage;
                break;
            default:
                this.start = 1;
        }
        if (state === 'last') {
            this.updatePage('last');
        } else {
            this.updatePage(0);
        }
    }

    showAll(e) {
        this.start = 1;
        if (e.data) {
            this.updatePage('all');
        }else {
            this.updatePage(0);
        }
    }

    updatePage(x) {
        if (x === 'last') {
            var showLast = this.length - ((this.numberPage - 1)*this.show);
            var link = "https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=" + showLast +"&start=" + this.start + "&sort=code_postal&facet=tco_libelle&facet=code_postal&facet=ville";
        }else if(x === 'all'){
            var link = "https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=" + this.length +"&start=" + this.start + "&sort=code_postal&facet=tco_libelle&facet=code_postal&facet=ville";
        }else if(x === 'inverse'){
            var link = "https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=" + this.length +"&start=" + this.start + "&sort=-code_postal&facet=tco_libelle&facet=code_postal&facet=ville";
        }else  {
            var link = "https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&rows=" + this.show +"&start=" + this.start + "&sort=code_postal&facet=tco_libelle&facet=code_postal&facet=ville";
        }
        this.dataService.getValues(link).subscribe(val => {
                this.val = val;
                this.records = this.val.records;
                // console.log(this.records);
                this.length = this.val.nhits;
                this.numberPage = Math.ceil(this.val.nhits/this.show);
            }
        );
    }

  constructor(private dataService: DataService) { }

  ngOnInit() {

      this.dataService.getData().subscribe(res => {
              this.data = res;
              this.start = 1;
              this.show = 15;
              console.log(this.data);
              this.title = "Liste des commerces à proximité";
              this.length = this.data.nhits;
              this.publisher = "RATP";
              this.records = this.data.records;

              // this.updatePage(0);
          }
      );
  }


}
