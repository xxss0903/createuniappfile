// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";

async function inputFolderName(uri: vscode.Uri) {
  // 创建一个folder
  const inputName = await vscode.window.showInputBox();
  console.log("input name", inputName);
  createFolderAndVueFile(inputName, uri);
}

function isDir(path: string) {
  try {
    var stat = fs.lstatSync(path);
    return stat.isDirectory();
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false;
  }
}

function createFolderAndVueFile(name: String | undefined, uri: vscode.Uri) {
  if (name) {
    // 创建文件夹和文件
    const wsedit = new vscode.WorkspaceEdit();
    const path = uri.fsPath;
    let dirPath = ""
    if (isDir(path)) {
      console.log("is dir");
      dirPath = path
    } else {
      console.log("is file");
      let index = path.lastIndexOf("/")
      dirPath = path.substring(0, index)
    }

    let filePath = `${dirPath}/${name}/${name}.vue`
    let fileUri = vscode.Uri.file(filePath);
    wsedit.createFile(fileUri, {ignoreIfExists: false});
    vscode.workspace.applyEdit(wsedit);
    vscode.window.showInformationMessage(
      `创建文件成功：${filePath}`
    );
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "createuniappfile" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "createuniappfile.createvuefile",
    (res: vscode.Uri) => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // 创建文件夹和文件
      console.log("click res", res);
      inputFolderName(res);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
