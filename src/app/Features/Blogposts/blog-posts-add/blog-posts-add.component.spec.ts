import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsAddComponent } from './blog-posts-add.component';

describe('BlogPostsAddComponent', () => {
  let component: BlogPostsAddComponent;
  let fixture: ComponentFixture<BlogPostsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogPostsAddComponent]
    });
    fixture = TestBed.createComponent(BlogPostsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
