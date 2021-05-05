import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { PostProps } from '../post.model'
import { PostsService } from '../posts.service'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: PostProps[] = []

  private postsSub: Subscription

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts()
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((posts: PostProps[]) => {
        this.posts = posts
      })
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe()
  }
}
