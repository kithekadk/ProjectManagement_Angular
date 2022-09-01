import { Pipe, PipeTransform } from '@angular/core';
import { project } from '../modules/auth/api-service.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: project[], name: string): project[] {
    if(!value || name === ''){
      return value
    }
    const filtered:project[]=[]
    for (let project of value){
      if(project.projectName.toLowerCase().includes(name.toLowerCase())){
        filtered.push(project)
      }
    }
    return filtered
  }

}
