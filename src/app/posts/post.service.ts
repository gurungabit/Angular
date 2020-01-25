import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();
  getPost() {
    return [...this.posts];
  }

  getPostUpdateListner() {
    return this.postUpdated.asObservable();
  }
  // tslint:disable-next-line: ban-types
  setPost(title: String, content: String) {
    const post: Post = { title, content };
    this.posts.push(post);
    this.postUpdated.next([...this.posts]);
  }
}
