Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Caminho do script batch
scriptPath = fso.GetParentFolderName(WScript.ScriptFullName) & "\INICIAR_BACKEND_SEMPRE.bat"

' Verificar se o XAMPP existe
xamppPath = "C:\xampp\php\php.exe"
If Not fso.FileExists(xamppPath) Then
    MsgBox "XAMPP não encontrado em C:\xampp\" & vbCrLf & vbCrLf & "Instale o XAMPP: https://www.apachefriends.org/", vbCritical, "Erro"
    WScript.Quit
End If

' Executar o script batch em uma nova janela
WshShell.Run "cmd /c """ & scriptPath & """", 1, False

' Aguardar um pouco
WScript.Sleep 2000

' Verificar se está rodando
On Error Resume Next
Set http = CreateObject("MSXML2.XMLHTTP")
http.Open "GET", "http://localhost:8000/products.php", False
http.Send

If Err.Number = 0 And http.Status = 200 Then
    MsgBox "✅ Backend iniciado com sucesso!" & vbCrLf & vbCrLf & "Backend: http://localhost:8000" & vbCrLf & "API: http://localhost:8000/products.php" & vbCrLf & vbCrLf & "⚠️ IMPORTANTE: Deixe a janela do backend aberta!", vbInformation, "Backend Iniciado"
Else
    MsgBox "⚠️ Backend iniciado, mas ainda não está respondendo." & vbCrLf & vbCrLf & "Aguarde alguns segundos e verifique a janela do backend.", vbExclamation, "Aguarde"
End If




