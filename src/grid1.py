from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout
from kivy.uix.image import Image

def build_grid():
    grid_layout = GridLayout(cols=1, padding=50, spacing=25)

    but_data_full = Button(text="verifié le dataset", on_press=lambda _: print("Button 1 clicked"))
    button2 = Button(text="Button 1", on_press=lambda _: print("Button 3 clicked"))
    button3 = Button(text="Button 1", on_press=lambda _: print("Button 3 clicked"))
    button4 = Button(text="Button 1", on_press=lambda _: print("Button 4 clicked"))
    button5 = Button(text="Button 1", on_press=lambda _: print("Button 5 clicked"))
    button6 = Button(text="Button 1", on_press=lambda _: print("Button 6 clicked"))
    button7 = Button(text="Button 1", on_press=lambda _: print("Button 7 clicked"))
    button8 = Button(text="Button 1", on_press=lambda _: print("Button 8 clicked"))
    button9 = Button(text="Button 1", on_press=lambda _: print("Button 9 clicked"))

    list_bouton=[but_data_full,button2,button3,button4,button5,button6,button7,button8,button9]

    for i,button in enumerate(list_bouton):
        button.add_widget(Image(source=f"image/grid1/logoBouton{i}.png"))
        grid_layout.add_widget(button)
    
    return grid_layout
