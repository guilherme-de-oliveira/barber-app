import { Component, OnInit } from '@angular/core';
import { SkillsDescription } from 'src/app/interfaces/menu-titles';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class DescriptionComponent implements OnInit{
  frontEnd: Array<SkillsDescription> = [
    {name: "JavaScript", icon: "javascript"},
    {name: "TypeScript", icon: "typescript"},
    {name: "Angular", icon: "angular"},
    {name: "Vue.js", icon: "vue"},
    {name: "RxJS", icon: "rxjs"},
    {name: "JQuery", icon: "jquery"},
  ];
  backEnd: Array<SkillsDescription> = [
    {name: "Node.js", icon: "nodejs"},
    {name: "PHP (CodeIgneter)", icon: "php"},
    {name: "SQL", icon: "sql"}, 
    {name: "CouchDB/Cloudant", icon: "couchdb"},
    {name: "Shell", icon: "bash"},
  ];
  system: Array<SkillsDescription> = [
    {name: "Linux", icon: "linux"},
    {name: "Docker", icon: "docker"}, 
    {name: "Travis CI", icon: "travis-ci"},
    {name: "Jenkins", icon: "jenkins"},
    {name: "Cloud", icon: "cloud"},
  ];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    
  }
  
}
