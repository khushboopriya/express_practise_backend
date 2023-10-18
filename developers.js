const express = require('express')
// const app = express()
const router = express.Router();
// import { developerData } from './data';
const developerData = require('./data');
const axios = require('axios');
const gitAPI = "https://api.github.com/users/";

router.get("/",(req,res)=>{
    // let data = developerData.map((developer) => {
    // //   return { id: developer.github_id, avatar_url: developer.avatar_url };
    // return 123;
    // });
    //map runs only on arrays and not objects, here obj.keys convert obj to array. 
    // console.log(Object.keys(developerData));
    let  developer_created = Object.keys(developerData).map((developer_id)=>{ 
        // console.log("inside obj keys",developer_id);
        // console.log("inside obj keys",developerData.abcd);
        return {id: developerData[developer_id].github_id, avatar_url: developerData[developer_id].avatar_url }; });
    // console.log(a);
    res.status(200).send(developer_created);
})

router.post('/',async (req,res)=>{
    const gitid = req.body.github_id;
    const user = req.body;
    // const user_obj_backend = {}
    try{
        const response_user = await axios.get(gitAPI+gitid)
        // console.log("response",response_user);
    // axios.get(gitAPI+gitid).then(data=> console.log(data))
    const {avatar_url, name, company, email,location, bio, blog, repos_url } = response_user.data;
    // console.log("avatar_url",avatar_url);
    user.avatar_url = avatar_url;
    user.name = name;
    user.company = company;
    user.email = email;
    user.location = location;
    user.bio = bio;
    user.blog = blog;
    // console.log("@@@@",user);
    const repos_user_res = await axios.get(repos_url);
    // console.log("reposdata",repos_user_res.data[0]);
    repos_user_list = repos_user_res.data.map((repo)=>{
        let repo_details = {};
        repo_details.name = repo.name;
        repo_details.html_url = repo.html_url;
        repo_details.description = repo.description;
        repo_details.updated_at = repo.updated_at;
        return repo_details;
    })
    user.repos = repos_user_list;
    // console.log("userwithrepos***",user);
    developerData[user.github_id] = user;
    // console.log("developerdata",developerData["khushboopriya"].repos);
    return res.status(201).send({id:user.github_id});
    }
    catch(error){
        res.status(500).send({message:error})
    }
});

router.get("/:developerId",(req,res)=>{
    if(developerData[req.params.developerId]){
        res.status(200).send({user:developerData[req.params.developerId],message:null});
    }
    else{
        res.status(404).send({user:null,message:"User Does not exist"});
    }
});

router.delete('/:developerId',(req,res)=>{
    if(developerData[req.params.developerId]){
        delete developerData[req.params.developerId];
        return res.status(204).send({});
        //only res.status doesn't work properly, we need to do res.send();
    }
    else{
        return res.status(404).send({message:"User Does not exist"});
    }
});

module.exports = router;

