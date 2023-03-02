from kivy.uix.screenmanager import Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.graphics import Rectangle,Color
from kivy.uix.widget import Widget


from grid1 import build_grid as build_grid1
from grid2 import build_grid as build_grid2
from grid3 import build_grid as build_grid3

#frame avec le logo le bouton importer
class topFrame(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.orientation='horizontal'
        self.size_hint = (1, 0.1)
        self.rect = rectVerti()
        self.add_widget(self.rect)
        self.add_widget(Button(text='importer les données',size_hint = (0.2, 1)))
        self.rect.update_rect()

#frame d'ecran principale
class displayFrame(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.orientation='horizontal'
        self.size_hint = (1, 0.9)
        self.current_grid = build_grid1()
        self.add_widget(menuFrame(self))
        self.add_widget(self.current_grid)

    def change_grid(self, new_grid):
        self.remove_widget(self.current_grid)
        self.current_grid = new_grid
        self.add_widget(self.current_grid)

        


class MenuButton(Button):
    def __init__(self, text, grid_builder, display_frame, **kwargs):
        super().__init__(**kwargs)
        self.text = text
        self.grid_builder = grid_builder
        self.display_frame = display_frame
        self.bind(on_press=self.show_grid)

    def show_grid(self, button):
        new_grid = self.grid_builder()
        self.display_frame.remove_widget(self.display_frame.current_grid)
        self.display_frame.current_grid = new_grid
        self.display_frame.add_widget(self.display_frame.current_grid)



#frame contenant le menu et le bouton reglage  
class menuFrame(BoxLayout):
    def __init__(self, display_frame, **kwargs):
        super().__init__(**kwargs)
        self.orientation='vertical'
        self.size_hint = (0.2, 1)
        self.display_frame = display_frame

        menu_buttons = [
            MenuButton("Grid 1", build_grid1, self.display_frame),
            MenuButton("Grid 2", build_grid2, self.display_frame),
            MenuButton("Grid 3", build_grid3, self.display_frame)
        ]
        menu_layout = BoxLayout(orientation='vertical')
        for button in menu_buttons:
            menu_layout.add_widget(button)

        self.rect = rectHori()
        self.add_widget(menu_layout)
        self.add_widget(self.rect)
        self.rect.update_rect()
    

        
#rectangle place-holder vertical
class rectVerti(Widget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        with self.canvas:
            Color(0.24,0.23,0.23)    
            self.rect = Rectangle(pos=self.pos, size=[0.8, 0.2])
            self.bind(pos=self.update_rect, size=self.update_rect)

    def update_rect(self, *args):
        self.rect.pos = self.pos
        self.rect.size = self.size

#rectangle place-holder horizontal
class rectHori(Widget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        with self.canvas:
            Color(0.24,0.23,0.23)  
            self.rect = Rectangle(pos=self.pos, size=self.size)
            self.bind(pos=self.update_rect, size=self.update_rect)

    def update_rect(self, *args):
        self.rect.pos = self.pos
        self.rect.size = self.size


#div principale
class MainFrame(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.orientation='vertical'
        self.add_widget(topFrame())
        self.add_widget(displayFrame())


#ecran principal gerer par le screen manager
class MainScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = 'main'
        self.add_widget(MainFrame())
