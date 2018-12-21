import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: any): any[] {
        if(!items) return [];
        if(!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter( it => {
            return it.fields.tco_libelle.toLowerCase().includes(searchText) + it.fields.ville.toLowerCase().includes(searchText) + it.fields.code_postal.toString().toLowerCase().includes(searchText);
        });
    }
}