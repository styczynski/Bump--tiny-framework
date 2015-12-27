(function(){var colors,fs,node_path;colors=require("colors/safe"),node_path=require("path"),fs=require("fs"),module.exports={fatal:function(message){throw console.log(colors.red(message+"\n")),new this.customError("Fatal Bump! Error")},customError:function(message,extra){return Error.captureStackTrace(this,this.constructor),this.name=this.constructor.name,this.message=message,this.extra=extra},getRelPath:function(program){var RelPath;return RelPath=node_path.resolve(program.path),RelPath=RelPath.replace(/\\/gi,"/")},getBuildConfig:function(RelPath){var buildConfig,e;try{buildConfig=fs.readFileSync(RelPath+"/build.json"),buildConfig=JSON.parse(buildConfig)}catch(_error){e=_error,this.fatal('Could not find build.json - This is not valid Bump! project.\nPlease create valid build.json file in directory: "'+RelPath+'"\nError details:\n'+e.message)}return buildConfig},spawnGruntCli:function(relpath,task,props){var spawnProps;return null==props&&(props={}),null==props.debug&&(props.debug=!1),null==props.stack&&(props.stack=!1),null==props.force&&(props.force=!1),null==props.write&&(props.write=!0),null==props.color&&(props.color=!0),null==props.verbose&&(props.verbose=!1),spawnProps={gruntfile:__dirname+"/../grunt_entrypoint.coffee",debug:props.debug,stack:props.stack,force:props.force,write:props.write,color:props.color,verbose:props.verbose,extra:{runTask:task,runConfig:props,targetPath:relpath}},process.argv=[],require("grunt").cli(spawnProps)}}}).call(this);