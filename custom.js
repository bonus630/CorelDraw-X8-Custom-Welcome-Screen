//Create by bonus630
$(document).ready(function(e) {
	var fileBox = $("body").find(".fileBox");
	fileBox.on("click",function(){
		window.external.Application.CreateDocument();
	});
	var RecentFiles = window.external.Application.RecentFiles;
	
	for(var i=1;i<=RecentFiles.Count;i++)
	{
		var tempBox = fileBox.clone();
		tempBox.find(".filePath").text(RecentFiles(i).Name);
		tempBox.find(".filePreview").attr("src",getPreviewPath(RecentFiles(i).FullName));
		tempBox.find(".clickArea").attr("data-filePath",RecentFiles(i).FullName);
		tempBox.find("span").css("display","block").attr("data-fileId",i).on("click",function(){removeRecentFile($(this));});
		tempBox.find(".clickArea").on("click",function(){
				openDocument($(this).attr("data-filePath"));
			});
		$("body").append(tempBox);
	}
});
function openDocument(stringPath)
{
	try{
		window.external.Application.OpenDocument(stringPath);
	}
	catch(exception)
	{
		alert("File not found!");
	}
}
function getPreviewPath(stringPath)
{
	var customDataPath = window.external.Application.UserDataPath;
	var previewName = stringPath.replace(/[a-zA-Z0-9]:/g, "");
	previewName = previewName.replace(/\\/g,"_");
	previewName = previewName.replace(/\.cdr/g,"_Preview.png");
	previewName = customDataPath.replace("Custom Data\\","draw\\previewcache\\"+previewName);
	return previewName;
}
function removeRecentFile(el)
{
	
	try{
		window.external.Application.RecentFiles(el.attr("data-fileId")).Delete();
	}
	catch(e)
	{
		alert(e);
		return;
	}
	el.parent().remove();
}


