from kivy.app import App
from kivy.uix.screenmanager import ScreenManager
from title_screen import TitleScreen
from main_screen import MainScreen
from kivy.core.window import Window

class MainApp(App):
    def build(self):
        self.title = 'Gorfou-IA'
        self.icon = 'image/Gorfou.png'

        Window.size = (1400, 700)
        Window.top = 100
        Window.left = 100
        
        screen_manager = ScreenManager()
        
        # accueil
        title_screen = TitleScreen(name='title')
        screen_manager.add_widget(title_screen)
        
        # écran principal
        main_screen = MainScreen(name='main')
        screen_manager.add_widget(main_screen)

        # set la page de démarrage sur l'écran titre
        screen_manager.current = 'title'
        
        return screen_manager
    
if __name__ == '__main__':
    MainApp().run()
