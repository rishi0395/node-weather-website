// https://devcenter.heroku.com/articles/heroku-cli

/************************************************************************************************* */
/** Steps to create SSH keys */

/**
 * Step 1: sudo snap install --classic heroku
 *
 * Step 2: heroku login // this command will allow to use heroku cli by logging in
 *
 * Step 3: ls -a -l ~/.ssh //to check if any _rsa file exists
 *
 * Step 4: ssh-keygen -t rsa -b 4096 -C "guptarishi64@gmail.com" //to create rsa secure key in local
 *          ls -a -l ~/.ssh
 *
 * Step 5: eval "$(ssh-agent -s)"
 *
 * Step 6: ssh-add ~/.ssh/id_rsa
 *
 * Step 7: go to github create new repository using ssh and add a remote branch
 *          i.e: git remote add origin git@github.com:rishi0395/node-weather-website.git
 *
 * Step 8: In the github web -> settings -> SSH and GPG keys, and click on new ssh key
 *
 * Step 9: give key like "work laptop" {anything will be fine and easy to identify}
 *
 * Step 10: cat ~/.ssh/id_rsa.pub
 *              the output will have to copy and paste into the "key" of the github web
 *
 * Step 11: ssh -T git@github.com //to check ssh is configured correctly type the given command
 *
 *              if working good then
 * Step 12: git push -u origin master
 *
 */

/*************************************************************************************************** */
/*************************************************************************************************** */
/** Steps to create Deploy code in heroku */

/**
 * Step 1: heroku keys:add
 *          enter "y"
 * 
 * Step 2: heroku create gupta-weather-application // create heroku project with given url
 * 
 * Step 3: then, got to package.json and add start script to type {"start": "node src/app.js"}
 *          test the app locally using npm start
 * 
 * Step 4: do git push all the changes, if made
 * 
 * Step 5: git remote //to check local branches, will get heroku as an option
 * 
 * Step 6: git push heroku master // this will deploy the code

 */
