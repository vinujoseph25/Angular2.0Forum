import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
// import multer from 'multer';


class Server {
    constructor(){
        this.app = express();
        this.fs = fs;
        

        // this.upload = multer({dest: 'uploads/'});
        this.dataFile  = path.join(__dirname, '../data.json');
    }

    configureApp() {
        this.app.set('port', (process.env.PORT || 3002));
        // this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    configureCORS(){
        // Additional middleware which will set headers that we need on each request.
        this.app.use((req, res, next) => {
            // Set permissive CORS header - this allows this server to be used only as
            // an API server in conjunction with something like webpack-dev-server.
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

            // Disable caching so we'll always get the latest blogs.
            res.setHeader('Cache-Control', 'no-cache');
            next();
        });
    }

    configureRoutes(){
      // Ignore this
      // this.app.post('/api/image', this.upload.single('image'), (req, res) => {
      //     console.log(req.file);
      //     res.json({image: 'http://localhost:1337/'+req.file.path})
      // });
        this.app.get('/api/blogs', (req, res) => {
            this.fs.readFile(this.dataFile, (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                res.json(JSON.parse(data));
            });
        });
        this.app.post('/api/blogs', (req, res) => {
            this.fs.readFile(this.dataFile, (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                }
                var blogs = JSON.parse(data);

                var newBlog = {
                    id: Date.now(),
                    title: req.body.title,
                    createdDate: req.body.createdDate,
                    content: req.body.content,
                    comments: req.body.comments,
                    countOfComments: req.body.countOfComments,
                    likes: req.body.likes,
                    disLikes: req.body.disLikes,
                };

                blogs.push(newBlog);
                this.fs.writeFile(this.dataFile, JSON.stringify(blogs, null, 4), (err) => {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }

                    // this.twilioClient.messages.create({
                    //   body: `Message from ${req.body.author}. Content: ${req.body.text}`,
                    //   to: process.env.TWILIO_TO,
                    //   from: process.env.TWILIO_FROM
                    //   // mediaUrl: 'http://www.yourserver.com/someimage.png'
                    // }, function(err, data) {
                    //   if (err) {
                    //     console.error('Could not notify administrator');
                    //     console.error(err);
                    //   } else {
                    //     console.log('Administrator notified');
                    //   }
                    // });
                    res.json(blogs);
                });
            });
        });
        // this.app.put('/api/blogs/:id', (req, res) => {
        //     this.fs.readFile(this.dataFile, (err, data) => {
        //         if (err) {
        //             console.error(err);
        //             process.exit(1);
        //         }
        //         let blogs = JSON.parse(data);
        //         let idIndex = 0;
        //         let findBlogById = blogs.filter(blog => {
        //             if(blog.id == req.params.id) {
        //                 idIndex = blogs.indexOf(blog);
        //                 return blog;
        //             }
        //         });
        //         findBlogById[0].text = req.body.text;
        //         findBlogById[0].author = req.body.author;

        //         blogs.splice(idIndex, 1, findBlogById[0]);
        //          this.fs.writeFile(this.dataFile, JSON.stringify(blogs, null, 4), function(err) {
        //             if (err) {
        //                 console.error(err);
        //                 process.exit(1);
        //             }
        //             res.json(blogs);
        //         });
        //     });
        // });
        // this.app.delete('/api/blogs/:id', (req, res) => {
        //     this.fs.readFile(this.dataFile, (err, data) => {
        //         if (err) {
        //             console.error(err);
        //             process.exit(1);
        //         }
        //         let blogs = JSON.parse(data);
        //         let idIndex = null;
        //         let findBlogById = blogs.filter(blog => {
        //             if(blog.id == req.params.id) {
        //                 idIndex = blogs.indexOf(blog);
        //                 return blog;
        //             }
        //         });

        //         if(idIndex >= 0){
        //             blogs.splice(idIndex, 1);
        //         }

        //          this.fs.writeFile(this.dataFile, JSON.stringify(blogs, null, 4), function(err) {
        //             if (err) {
        //                 console.error(err);
        //                 process.exit(1);
        //             }
        //             res.json(blogs);
        //         });
        //     });
        // });
    }

    listen(port){
        this.app.listen(port, () => {
            console.log(`Server started: http://localhost:${port}/`);
        });
    }

    run(){
        this.configureApp();
        this.configureCORS()
        this.configureRoutes();
        this.listen(this.app.get('port'));
    }
}

export default Server;
