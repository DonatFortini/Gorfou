from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout
from kivy.core.window import Window


from grid1 import build_grid as build_grid1
from grid2 import build_grid as build_grid2
from grid3 import build_grid as build_grid3


class Navbar(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.size_hint_y = 0.1
        self.add_widget(Button(text="Importer des données"))


class MenuButton(Button):
    def __init__(self, text, grid_builder, **kwargs):
        super().__init__(**kwargs)
        self.text = text
        self.grid_builder = grid_builder


class MainScreen(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

        
        menu_buttons = [
            MenuButton("Grid 1", build_grid1),
            MenuButton("Grid 2", build_grid2),
            MenuButton("Grid 3", build_grid3)
        ]

        
        menu_layout = GridLayout(cols=1, size_hint_x=0.2)
        for button in menu_buttons:
            button.bind(on_press=self.show_grid)
            menu_layout.add_widget(button)

        
        self.add_widget(menu_layout)
        self.current_grid = build_grid1()
        self.add_widget(self.current_grid)

        
    def show_grid(self, button):
        
        self.remove_widget(self.current_grid)
        self.current_grid = button.grid_builder()
        self.add_widget(self.current_grid)


class MyApp(App):
    def build(self):
        Window.size = (1400, 700)
        Window.top = 100
        Window.left = 100

        self.icon='image/Gorfou.png'
        main_layout = BoxLayout(orientation="vertical")
        main_layout.add_widget(Navbar())
        main_layout.add_widget(MainScreen())

        return main_layout


if __name__ == "__main__":
    MyApp().run()
