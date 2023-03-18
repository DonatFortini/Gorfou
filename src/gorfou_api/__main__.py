
import sys
import partie_json.JupyterServer as JupyterServer
import partie_json.Notebook as Notebook


def main():
    match sys.argv()[0]:
        case "lancement_preview":
            lancement_preview()


def lancement_preview():
    mon_serveur = JupyterServer.JupyterServer()
    mon_serveur.run_server()
    mon_serveur.open_browser()
    mon_serveur.stop_server()


def creer_notebook(name):
    mon_notebook = Notebook.Notebook(name)
    print(mon_notebook)


if __name__ == "__main__":
    main()


creer_notebook("aaaaaa")
