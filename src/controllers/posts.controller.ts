import { Controller, Get, Param } from '../decorators';
import { postsStub } from '../stub';

@Controller('/posts')
export class PostsController {
  @Get('')
  getListPosts() {
    return postsStub;
  }

  @Get('/:postId')
  getOnePost(@Param('postId') postId: any) {
    console.log(postId); // log the ID from params
    return 'not implemented';
  }

  @Get('/:postId/:comments')
  getOnePostAndCommments(
    @Param('postId') postId: any,
    @Param('comments') comments: any
  ) {
    console.log('getOnePost2', postId, comments); // log the ID from params
    return 'not implementedss';
  }
}

// return postsStub.find(p => p.id === id);
