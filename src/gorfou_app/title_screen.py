from kivy.graphics import Color, Rectangle
from kivy.uix.screenmanager import Screen
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.image import Image


class TitleScreen(Screen):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.name = "title"

        with self.canvas.before:
            Color(0.24, 0.23, 0.23)
            self.rect = Rectangle(size=self.size, pos=self.pos)
            self.bind(size=self._update_rect, pos=self._update_rect)

        self.title = Label(
            text="Gorfou-IA",
            font_size="50sp",
            pos_hint={"center_x": 0.5, "center_y": 0.9},
        )
        self.image = Image(
            source="../resources/image/Gorfou.png",
            pos_hint={"center_x": 0.5, "center_y": 0.6},
            size_hint=(0.6, 0.6),
        )

        self.import_button = Button(
            text="Importer\n     des\ndonnées",
            font_size="20sp",
            size_hint=(0.2, 0.1),
            pos_hint={"center_x": 0.5, "center_y": 0.4},
            on_press=self.play,
        )
        self.traitement = Button(
            text="Traitement\n     de\ndonnées",
            font_size="20sp",
            size_hint=(0.2, 0.1),
            pos_hint={"center_x": 0.25, "center_y": 0.25},
        )
        self.model = Button(
            text="Création\n     de\nmodèle",
            font_size="20sp",
            size_hint=(0.2, 0.1),
            pos_hint={"center_x": 0.5, "center_y": 0.25},
        )
        self.visual = Button(
            text="Visualisation",
            font_size="20sp",
            size_hint=(0.2, 0.1),
            pos_hint={"center_x": 0.75, "center_y": 0.25},
        )

        self.add_widget(self.title)
        self.add_widget(self.image)
        self.add_widget(self.import_button)
        self.add_widget(self.traitement)
        self.add_widget(self.model)
        self.add_widget(self.visual)

    def _update_rect(self, instance, value):
        self.rect.pos = instance.pos
        self.rect.size = instance.size

    def play(self, instance):
        screen_manager = self.manager
        screen_manager.current = "main"
