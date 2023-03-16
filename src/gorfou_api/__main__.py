
import sys
import partie_json.JupyterServer as JupyterServer


def main():
    match sys.argv()[0]:
        case "lancement_preview":
            lancement_preview()


def lancement_preview():
    monServer = JupyterServer.JupyterServer()
    monServer.run_server()
    monServer.open_browser()
    monServer.stop_server()


if __name__ == "__main__":
    main()
