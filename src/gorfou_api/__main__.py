
import sys
import partie_json.JupyterServer as JupyterServer
import partie_json.Notebook as Notebook


def main():
    argument_1 = sys.argv[1]
    print(sys.argv)
    match argument_1:
        case "import_data":
            import_data(sys.argv[2], sys.argv[3])


def lancement_preview():
    mon_serveur = JupyterServer.JupyterServer()
    mon_serveur.run_server()
    mon_serveur.open_browser()
    mon_serveur.stop_server()


def import_data(path, name):
    mon_notebook = Notebook.Notebook("temp")
    mon_notebook.save()
    mon_notebook.import_data(path, name)


if __name__ == "__main__":
    main()
