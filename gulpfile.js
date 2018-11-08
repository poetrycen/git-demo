/*
* @Author: Administrator
* @Date:   2018-10-14 17:13:51
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-15 17:27:55
*/
'use strict';
/*
*1.less编绎 压缩 合并
*2.js合并 压缩 混淆
*3.img的拷贝
*4.html压缩
 */

//在gulpfile先载入gulp的包提供了API
var gulp=require('gulp');
var less=require('gulp-less');  //编绎LESS文件
var cssnano=require('gulp-cssnano');  //压缩CSS文件
var concat=require('gulp-concat');  //合并所有JS文件
var uglify=require('gulp-uglify');  //混淆JS文件
var htmlmin=require('gulp-htmlmin');  //压缩HTML文件
var browserSync=require('browser-sync');

//*1.less编绎 压缩 合并
gulp.task('style',function(){
	//这里是在执行style任务时自动执行的
	gulp.src(['src/css/*.less'])   //1.匹配多种路径，要放在中括号里，再用,分隔  2.路径前面加！是不取前面有下划线的less文件的意思 ，因为less有导入功能，这样后期就不用做less合并操作
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('./dist/css'))
})

//2.js的压缩和混淆,先合并，再混淆
gulp.task('script',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
})

//3.图片复制
gulp.task('image',function(){
	gulp.src('src/img/*.*')
	.pipe(gulp.dest('dist/img'))
})

//4.压缩html文件
gulp.task('html',function(){	
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist'))
})


//5.启动一个服务，顺便监视项目的变化
gulp.task('server',function(){
	browserSync({
		server:{
			baseDir:'dist/'
		}		
	},function(err,bs){
		console.log(bs.options.getIn(["urls","local"]))
	});
	gulp.watch('src/css/*.less',['style']);
	gulp.watch('src/js/*.js',['script']);
	gulp.watch('src/img/*.*',['image']);
	gulp.watch('src/*.html',['html']);	
});
