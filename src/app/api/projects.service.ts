import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { apiURL } from './config';
import { Project, ProjectWithTeam } from './data-contracts';

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

  getProjectWithTeam(id: ProjectWithTeam['id']) {
    return this.http.get<ProjectWithTeam>(`${apiURL}/projects/${id}/team`)
  }

  getPage(page: number = 1, pageSize = 20) {
    const params = new HttpParams()
      .set('pageSize', String(pageSize))
      .set('page', String(page));

    return this.http.get<Project[]>(`${apiURL}/projects`, { params })
  }

  getCount() {
    return this.http.get<number>(`${apiURL}/projects/count`)
  }

  getAllProjects() {
    return this.getPage()
  }
}
