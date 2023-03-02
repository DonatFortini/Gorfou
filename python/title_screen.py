from kivy.uix.screenmanager import Screen
from kivy.uix.label import Label
from kivy.uix.button import Button

class TitleScreen(Screen):
    #ecran d'acceuil 
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = 'title'
        
        self.title = Label(text='Gorfou', font_size='50sp', pos_hint={'center_x': 0.5, 'center_y': 0.7})
        self.add_widget(self.title)
        
        self.import_button = Button(text='importer des données', font_size='30sp', size_hint=(0.2, 0.1), pos_hint={'center_x': 0.5, 'center_y': 0.3}, on_press=self.play)
        self.add_widget(self.import_button)

    def play(self, instance):
        # accede au screen manager ->demarre l'appli
        screen_manager = self.manager
        screen_manager.current = 'main'