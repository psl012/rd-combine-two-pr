class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){        
        let num_of_changes = 0;
        let file_directories = "";

        for(let key in this.working_directory.new_changes){
            file_directories += "\n" + key;
            num_of_changes++;
        }
        
        if(num_of_changes === 0){
            return "You have 0 change/s.\n";
        }

        return "You have "+num_of_changes+" change/s."+file_directories;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        else if(path_file == "*"){
            let file_list = Object.keys(modified_files);

            for(let row=0; row < file_list.length; row++){
                if(!file_list[row].startsWith(".")){
                    this.staging.push(modified_files[file_list[row]]);
                    delete this.working_directory.new_changes[file_list[row]]; 
                }
            }
        }
        else if(path_file == "."){
            this.staging.push(modified_files);
            this.working_directory.new_changes = {};

        }
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;