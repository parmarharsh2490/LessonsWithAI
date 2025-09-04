import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IKnowledgeBase } from '../model/knowledgebase.model';

@Injectable({
  providedIn: 'root',
})
export class KnowledgebaseService {
  constructor(private http: HttpClient) {
    console.log(this.http);
  }

  getKnowledgebaseList(): Observable<IKnowledgeBase[]> {
    return of([
      {
        createdAt: '11-03-2025 07:11',
        _id: '52b26698-293b-4df6-974a-414766aa6e45',
        fileUrl:
          'https://jtuyprjjgxbgmtjiykoa.supabase.co/storage/v1/object/public/files/1741657261979-1f835a84-af82-4bea-aab3-13e67e27718c.pdf',
        fileName: 'resume.pdf',
        type: 'file',
        fileSize: '661257',
      },
      {
        createdAt: '31-07-2025 20:04',
        _id: 'd0bc4f03-9af8-4a95-8da4-82a7fb4b6e2d',
        fileUrl:
          'https://jtuyprjjgxbgmtjiykoa.supabase.co/storage/v1/object/public/files/1753972488466-da4fe791-f90f-4b95-9fad-e3691b5d283a.pdf',
        fileName: 'Hitech Digital Solutions.pdf',
        type: 'file',
        fileSize: '60856',
      },
    ]);
  }
}
