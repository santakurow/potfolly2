FactoryBot.define do
  factory :user do
    nickname {"takuya"}
    email {"hoge1@hoge.com"}
    password {"foobar"}
    password_confirmation {"foobar"}
  end
end