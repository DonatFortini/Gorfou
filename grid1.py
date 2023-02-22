from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout

def build_grid():
    grid_layout = GridLayout(cols=3, padding=50, spacing=25)

    button1 = Button(text="Button 1", on_press=lambda _: print("Button 1 clicked"))
    button2 = Button(text="Button 1", on_press=lambda _: print("Button 3 clicked"))
    button3 = Button(text="Button 1", on_press=lambda _: print("Button 3 clicked"))
    button4 = Button(text="Button 1", on_press=lambda _: print("Button 4 clicked"))
    button5 = Button(text="Button 1", on_press=lambda _: print("Button 5 clicked"))
    button6 = Button(text="Button 1", on_press=lambda _: print("Button 6 clicked"))
    button7 = Button(text="Button 1", on_press=lambda _: print("Button 7 clicked"))
    button8 = Button(text="Button 1", on_press=lambda _: print("Button 8 clicked"))
    button9 = Button(text="Button 1", on_press=lambda _: print("Button 9 clicked"))

    grid_layout.add_widget(button1)
    grid_layout.add_widget(button2)
    grid_layout.add_widget(button3)
    grid_layout.add_widget(button4)
    grid_layout.add_widget(button5)
    grid_layout.add_widget(button6)
    grid_layout.add_widget(button7)
    grid_layout.add_widget(button8)
    grid_layout.add_widget(button9)

    return grid_layout
