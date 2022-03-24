import { Controller, Get, Param } from '../common/decors';
import { postsStub } from '../stub';

@Controller('/posts')
export class PostsController {
  @Get('')
  getListPosts() {
    return postsStub;
  }

  @Get('/:id')
  getOnePost(@Param('id') id:any) {
    console.log(id.params);
    return 'not implemented yet';
  }
}
