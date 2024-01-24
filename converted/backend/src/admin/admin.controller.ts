import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/create-admin')
  create(@Body(ValidationPipe) createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Post('/admin-login')
  login(@Body(ValidationPipe) loginAdminDto: LoginAuthDto) {
    return this.adminService.adminLogin(loginAdminDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
  //   return this.adminService.update(+id, updateAdminDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
