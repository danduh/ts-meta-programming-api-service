import { Controller, Get, Param } from '../common/decors';
import { postsStub } from '../stub';

@Controller('/posts')
export class PostsController {
    @Get('')
    getListPosts(){
        return postsStub;
    }

    @Get('/:id')
    getOnePost(@Param('id') id: any){
        return "not implemented"
    }
}













// return postsStub.find(p => p.id === id);