import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apiURL } from './config';
import { Project } from './data-contracts';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private http: HttpClient
  ) { }

  deleteProject(id: Project['id']) {
    return this.http.delete(`${apiURL}/projects/${id}`)
  }

  getProject(id: Project['id']) {
    return this.http.get<Project>(`${apiURL}/projects/${id}`)
  }

  getPage(page: number = 1, pageSize = 50) {
    return this.http.get<Project[]>(`${apiURL}/projects?_limit=${pageSize}&_page=${page}`)
  }

  getCount() {
    return this.http.get<number>(`${apiURL}/projects/count`)
  }

  getAllProjects() {
    return this.getPage()
  }
}
