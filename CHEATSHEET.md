# 📋 Шпаргалка по GitHub

## 🤝 Как добавить соавтора (Collaborator)

### Шаг 1: Откройте настройки репозитория

1. Перейдите на страницу вашего репозитория на GitHub
2. Нажмите на вкладку **Settings** (⚙️ Настройки)
3. В левом меню выберите **Collaborators** (или **Collaborators and teams** для организаций)

### Шаг 2: Пригласите соавтора

1. Нажмите кнопку **Add people** (Добавить людей)
2. Введите имя пользователя GitHub, полное имя или email адрес
3. Выберите нужного пользователя из списка
4. Нажмите **Add [username] to this repository**

### Шаг 3: Соавтор принимает приглашение

1. Приглашенный получит уведомление на GitHub и email
2. Он должен нажать на ссылку приглашения
3. Нажать **Accept invitation** (Принять приглашение)

---

## 🔐 Уровни доступа

| Роль | Возможности |
|------|-------------|
| **Read** | Только просмотр кода |
| **Triage** | Управление issues и pull requests |
| **Write** | Может push-ить код в репозиторий |
| **Maintain** | Управление репозиторием без доступа к опасным настройкам |
| **Admin** | Полный доступ, включая настройки |

---

## 💡 Полезные советы

### Для личного репозитория
- По умолчанию соавторы получают **Write** доступ
- Вы можете изменить права доступа в настройках

### Для репозитория организации
- Используйте **Teams** для групповых прав
- Настройте **Branch protection rules** для важных веток

---

## 🔗 Быстрые ссылки

- [Документация GitHub по добавлению соавторов](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-access-to-your-personal-repositories/inviting-collaborators-to-a-personal-repository)
- [Управление доступом к репозиторию](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/managing-teams-and-people-with-access-to-your-repository)

---

## 📝 Как добавить соавтора в коммит

Если хотите отметить соавтора в конкретном коммите, добавьте в сообщение коммита:

```
Co-authored-by: Имя <email@example.com>
```

Пример:
```bash
git commit -m 'Добавлена новая функция

Co-authored-by: Ivan Petrov <ivan@example.com>'
```

Или используйте редактор для многострочных коммитов:
```bash
git commit
# Откроется редактор, добавьте Co-authored-by в конце сообщения
```

---

## 🚀 Git команды для совместной работы

```bash
# Получить последние изменения
git pull origin main

# Создать новую ветку для работы
git checkout -b feature/my-feature

# После коммитов отправить на GitHub
git push origin feature/my-feature

# Создать Pull Request на GitHub
# (через веб-интерфейс GitHub)
```

---

**Создано для:** Playable Ads Portfolio  
**Обновлено:** 2024
